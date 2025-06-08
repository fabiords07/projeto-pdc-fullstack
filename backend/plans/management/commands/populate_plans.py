from django.core.management.base import BaseCommand
from plans.models import DentalPlan

class Command(BaseCommand):
    help = 'Popula o banco com os planos dentais'

    def handle(self, *args, **options):
        plans_data = [
            {
                'name': 'Plano Essencial',
                'price': 30.00,
                'description': 'Rol ANS, Prótese unitária em dentes anteriores e posteriores em cerômero. Procedimentos em ortodontia.',
                'order': 1
            },
            {
                'name': 'Plano Conforto',
                'price': 80.00,
                'description': 'Plano Essencial + Prótese removível (inclusive prótese total), prótese unitária em dentes anteriores e posteriores em cerômero.',
                'order': 2
            },
            {
                'name': 'Plano Completo',
                'price': 150.00,
                'description': 'Plano Conforto + Documentação ortodôntica completa, manutenção mensal, clareamento com moldeira (gel + moldeira) e placa miorrelaxante.',
                'order': 3
            },
            {
                'name': 'Plano Premium',
                'price': 200.00,
                'description': 'Plano Completo + Prótese fixa, inclusive em porcelana, e clareamento em consultório.',
                'order': 4
            },
            {
                'name': 'Plano Elite',
                'price': 250.00,
                'description': 'Plano Premium + Cobertura ortodôntica com alinhador invisível com instalação. Prótese unitária em dentes anteriores e posteriores em cerômero.',
                'order': 5
            },
            {
                'name': 'Plano Platinum',
                'price': 300.00,
                'description': 'Plano Elite + Restauração, Extração, Clareamento em gel e moldeira (caseiro), Placa miorrelaxante. E muito mais.',
                'order': 6
            }
        ]

        for plan_data in plans_data:
            plan, created = DentalPlan.objects.get_or_create(
                name=plan_data['name'],
                defaults=plan_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Plano "{plan.name}" criado com sucesso!')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Plano "{plan.name}" já existe.')
                )

                