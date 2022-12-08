from django.urls import path
from . import views #blog アプリの全てのviewをインポート

urlpatterns = [
    path('', views.post_list, name='post_list'),
]
#誰かが'http://127.0.0.1:8000/'というアドレスにアクセスしてきたら
#views.post_list が正しい行き先だということをDjangoに伝える
#name='post_list' は、ビューを識別するために使われるURL の名前