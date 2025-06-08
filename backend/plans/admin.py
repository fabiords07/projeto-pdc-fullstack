from django.contrib import admin
from .models import DentalPlan, ContactMessage

@admin.register(DentalPlan)
class DentalPlanAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['price', 'order', 'is_active']
    ordering = ['order', 'price']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'price', 'order', 'is_active')
        }),
        ('Descrição', {
            'fields': ('description',)
        }),
        ('Controle', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'phone']
    list_editable = ['is_read']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Informações de Contato', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Mensagem', {
            'fields': ('message',)
        }),
        ('Controle', {
            'fields': ('is_read', 'created_at')
        }),
    )
    
    def has_add_permission(self, request):
        # Opcional: impede criar mensagens pelo admin (apenas pelo formulário)
        return False