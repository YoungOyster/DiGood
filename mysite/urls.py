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
from django.conf import settings
from django.conf.urls.static import static

#blog アプリからURLをインポートするだけ
urlpatterns = [
    path('admin/', admin.site.urls), #admin/ で始まる全てのURLについて、Djangoが返すべきビューをこの行で指定
    path('blog/', include('blog.urls')), #blog.urls をインポートする。
]+static(settings.STATIC_URL, document_root = settings.STATICFILES_DIRS)
if settings.DEBUG:  #ローカル環境の時のみ以下を実行
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    #MEDIA_ROOTのディレクトリ内のファイルをMEDIA_URL起点のurlでアクセスできるようになる。