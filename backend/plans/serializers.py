from rest_framework import serializers
from .models import DentalPlan, ContactMessage

class DentalPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DentalPlan
        fields = ['id', 'name', 'price', 'description', 'order']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'phone', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_phone(self, value):
        # Remove espaços e caracteres especiais
        phone = ''.join(filter(str.isdigit, value))
        if len(phone) < 10:
            raise serializers.ValidationError("Telefone deve ter pelo menos 10 dígitos.")
        return value

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Nome deve ter pelo menos 2 caracteres.")
        return value.strip()

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Mensagem deve ter pelo menos 10 caracteres.")
        return value.strip()