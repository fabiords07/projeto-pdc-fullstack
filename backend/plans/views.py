from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import DentalPlan, ContactMessage
from .serializers import DentalPlanSerializer, ContactMessageSerializer

class DentalPlanListView(generics.ListAPIView):
    serializer_class = DentalPlanSerializer
    
    def get_queryset(self):
        return DentalPlan.objects.filter(is_active=True)

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Mensagem enviada com sucesso!",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {
                "message": "Erro ao enviar mensagem.",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def api_status(request):
    return Response({
        "status": "online",
        "message": "API Dental funcionando corretamente!",
        "endpoints": {
            "plans": "/api/plans/",
            "contact": "/api/contact/",
            "status": "/api/status/"
        }
    })