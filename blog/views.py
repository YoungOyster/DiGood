from django.shortcuts import render
from django.utils import timezone
from .models import Coordinates #models.py のモデルをインクルード
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import json


def top(request):
    return render(request, 'blog/post_list.html')

#引数のrequest
@csrf_exempt
def save_coords(request):
    if request.is_ajax(): #リクエストがAJAXリクエストかどうかを判定。
        if request.method == 'POST':
            c_x = request.POST.get('coords_x') #POSTリクエストで送信された"coords_x"というデータを保持する辞書型オブジェクトを生成
            c_y = request.POST.get('coords_y')  #request.POST[キー名('coords_x')]でもできるかも
            c_width = request.POST.get('click_Width')
            c_height = request.POST.get('click_Height')
            c_mark = request.POST.get('click_mark')
            Coords = Coordinates(coords_x = c_x, coords_y = c_y, click_Width = c_width, click_Height = c_height, click_mark = c_mark)
            Coords.save()
            response = JsonResponse({'success': True}, safe=False)  #処理が成功したことを示すレスポンス
        else:
            response = HttpResponseBadRequest('Invalid request method')
        return response

def get_coords(request):
    if request.method == 'GET':
        # Coords = Coordinates.objects.all() #全データを取得
        # Coords = serializers.serialize("json", Coordinates.objects.filter(pk=1))

        # Coords = serializers.serialize("json", Coordinates.objects.all())
        # response = JsonResponse({'Coords': Coords}, safe=False)

        Coords_qsList = Coordinates.objects.values('coords_x', 'coords_y', 'click_Width', 'click_Height', 'click_mark') #QuerySetのリスト
        print(Coords_qsList)
        List = []
        for item in Coords_qsList:
            List.append(list(item.values()))
        print(List)
        response = JsonResponse(List, safe=False)
    else:
        response = HttpResponseBadRequest('Invalid request method')
    return response
