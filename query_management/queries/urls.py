from django.urls import path
from .views import QueryListCreate, QueryRetrieveUpdate

urlpatterns = [
    path('queries/', QueryListCreate.as_view(), name='query-list-create'),
    path('queries/<int:pk>/', QueryRetrieveUpdate.as_view(), name='query-retrieve-update'),
]
