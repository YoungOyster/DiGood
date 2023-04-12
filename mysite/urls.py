"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

#blog アプリからURLをインポートするだけ
urlpatterns = [
    path('admin/', admin.site.urls), #admin/ で始まる全てのURLについて、Djangoが返すべきビューをこの行で指定
    path('', include('blog.urls')), #blog.urls をインポートする。'http://127.0.0.1:8000/' に来たリクエストは blog.urls へリダイレクトするようになる
    path('view/', include('blog.urls')),
    path('server/', include('blog.urls'))
]
