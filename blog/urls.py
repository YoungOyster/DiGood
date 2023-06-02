from django.urls import path
from . import views #blogアプリの全てのviewをインポート

urlpatterns = [
    path('', views.top, name='top_page'),
    path('home/', views.home, name='home_page'),
    path('view/', views.save_coords, name='save_coords'),
    path('server/', views.get_coords, name='get_coords'),
]
#誰かが'http://127.0.0.1:8000/'というアドレスにアクセスしてきたら
#views.post_list が正しい行き先だということをDjangoに伝える(views.pyファイルのpost_list関数を実行する)
#name='post_list' は、ビューを識別するために使われるURL の名前
