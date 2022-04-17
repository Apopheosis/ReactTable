from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListEntry.as_view()),
    path('<int:pk>/', views.DetailEntry.as_view())
]