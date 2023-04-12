from django.conf import settings
from django.db import models
from django.utils import timezone

#作りたいテーブルに合わせてフィールドタイプを選択して、アトリビュート(属性)設定

# #投稿のテーブル
# class Post(models.Model):
#     author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     title = models.CharField(max_length=200)
#     text = models.TextField()
#     #日付と時間のためのフィールド。
#     #blank=True の場合、そのフィールドは投稿フォームでは必須ではない。
#     #フォームのフィールドを空白にする場合、データベースで NULL の値を指定する。
#     created_date = models.DateTimeField('作成日', default=timezone.now)
#     published_date = models.DateTimeField(blank=True, null=True)
#     url = models.SlugField
#     # 追加が必要な箇所。いいねの数を記事に紐づけて保存する。
#     good = models.IntegerField('Good',default=0)

#     def publish(self):
#         self.published_date = timezone.now()
#         self.save()

#     def __str__(self):
#         return self.title


#座標のテーブル
class Coordinates(models.Model):
    coords_x = models.FloatField('x座標', default=0)  #JSON使う場合はFloatfieldじゃなくて
    coords_y = models.FloatField('y座標', default=0)  #JSONFieldがいいかもしれない
    click_Width = models.FloatField('クリック時のWidth', default=0)
    click_Height = models.FloatField('クリック時のHeight', default=0)
    click_mark = models.CharField('クリック時のマーク', default='&#128147;', max_length=50)
    