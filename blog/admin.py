from django.contrib import admin
from .models import Coordinates #, Post

#adminページで編集できるようにする

# admin.site.register(Post)   #投稿を操作するUIが作られる
admin.site.register(Coordinates) #座標を操作するUIが作られる