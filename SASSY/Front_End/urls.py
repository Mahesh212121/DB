from django.urls import path, re_path
from .views import index


urlpatterns = [
    path("", index),

    path("front-desk-operator", index),
    path("data-field-operator", index),

    path("doctor/", index),
    path("doctor/pending-appointments", index),
    re_path(r"doctor/patients/.*$", index),

    path("adminstrator/", index),
    path("adminstrator/fdos", index),
    path("adminstrator/deos", index),
    path("adminstrator/doctors", index),
    path("adminstrator/admins", index),
    path("adminstrator/create-user", index),

    path("front-desk-operator/", index),
    path("data-entry-operator/", index)
]
