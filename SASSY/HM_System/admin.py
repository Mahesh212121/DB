from django.contrib import admin
from .models import User, Patient, Doctor, FdOperator, DataOperator, Administrator

# Register your models here.
admin.site.register(User)
admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(FdOperator)
admin.site.register(DataOperator)
admin.site.register(Administrator)
