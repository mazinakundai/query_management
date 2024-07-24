from rest_framework import generics, status
from rest_framework.response import Response
from .models import Query
from .serializers import QuerySerializer


class QueryListCreate(generics.ListCreateAPIView):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class QueryRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
