from django.urls import path
from .views import DentalPlanListView, ContactMessageCreateView, api_status

urlpatterns = [
    path('plans/', DentalPlanListView.as_view(), name='dental-plans-list'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-message-create'),
    path('status/', api_status, name='api-status'),
]