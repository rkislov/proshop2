from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']

    if orderItems and len(orderItems) ==0 :
        return Response({'detail': 'Нет товаров в заказе'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
        )
        shipppingAddress = ShippingAddress.objects.create(
            order=order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalcode'],
            country = data['shippingAddress']['country'],
        )
        
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            print(product._id)
            item = OrderItem.objects.create(
                product = product,
                order=order,
                name = product.name,
                qty= i['qty'],
                price = i['price'],
                image = product.image.url,
            )
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    
    user = request.user
    
    try:
        order = Order.objects.get(_id=pk)
        
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            
            return Response(serializer.data)
        else:
            Response({'detail':'Не разрешен просмотр данного заказа'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Такого заказа не существует'}, status=status.HTTP_400_BAD_REQUEST)
