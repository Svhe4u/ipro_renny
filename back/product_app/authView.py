from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import uuid
from datetime import datetime, timezone
from product_pro.settings import sendResponse, connectDB, sendMail
from django.contrib.auth.hashers import make_password, check_password




def login(request):
    try:
        jsons = json.loads(request.body)
        email = jsons['email']
        password = jsons['password']
    except Exception as e:
        res = sendResponse(4006)
        return res

    try:
        with connectDB() as con:
            cur = con.cursor()

            query = f'''SELECT email FROM whois.t_person_details
                        WHERE email='{email}' '''
            cur.execute(query)
            data = cur.fetchone()

            if not data:
                res = sendResponse(1004)
                return res

            query = f'''SELECT password, firstname, pid  FROM whois.t_person_details
                        WHERE email='{email}' and is_verified=true '''
            cur.execute(query)
            data = cur.fetchone()

            if not data:
                res = sendResponse(4008)
                return res

            if not check_password(password, data[0]):
                res = sendResponse(4007)
                return res

            resJson = {
                'pid': data[2],
                'firstname': data[1]
            }
            res = sendResponse(200, [resJson])
            return res
    except Exception as e:
        print(f'###################{e}')
        res = sendResponse(5001)
        return res
# login
def register(request):
    data = json.loads(request.body)
    try:
        email = data['email']
        password = data['password']
    except:
        return sendResponse(4004)
    try:
        with connectDB() as con:
            cur = con.cursor()
            query = f'''SELECT COUNT(*) FROM whois.t_person_details WHERE email='{email}' '''
            cur.execute(query)
            dataFromDb = cur.fetchone()[0]

            if dataFromDb != 0:
                return sendResponse(1000)

            query = f'''INSERT INTO whois.t_person_details(
                            email, password, is_verified, created_date)
                            VALUES ( '{email}', '{make_password(password)}', false, NOW() )
                            RETURNING pid;'''
            cur.execute(query)
            pid = cur.fetchone()[0]

            token = str(uuid.uuid4())
            query = f'''INSERT INTO whois.t_token(
                             uid, token, tokentype, tokenenddate, createddate)
                            VALUES ( {pid}, '{token}', 'register', NOW() + interval '1 day', NOW() );'''
            cur.execute(query)

            bodyHTML = F"""<a target='_blank' href=http://localhost:8000/api/auth?token={token}>CLICK ME</a>"""
            sendMail(email, 'Баталгаажуулах код', bodyHTML)
            con.commit()
            return sendResponse(200, action='register')
    except Exception as e:
        print(f'###############################: {e}')
        return sendResponse(5004)
# resigter


@csrf_exempt
def authCheckService(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except Exception as e:
            res = sendResponse(4001)
            return JsonResponse(res)

        if 'action' not in data:
            res = sendResponse(4002)
            return JsonResponse(res)

        if data['action'] == 'register':
            res = register(request)
            return JsonResponse(res)
        elif data['action'] == 'login':
            res = login(request)
            return JsonResponse(res)
        else:
            res = sendResponse(4003)
            return JsonResponse(res)

    elif request.method == 'GET':
        with connectDB() as con:
            try:
                token = request.GET.get('token', 'detault_value')

                cur = con.cursor()
                query = f'''SELECT uid FROM public.t_token WHERE token='{token}' and tokenenddate > NOW() '''
                cur.execute(query)
                pid = cur.fetchone()
                if pid is None:
                    res = sendResponse(1001, action='register')
                    return JsonResponse(res)

                query = f'''SELECT is_verified FROM public.t_user WHERE pid='{pid[0]}' '''
                cur.execute(query)
                data=cur.fetchone()[0]

                if data is True:
                    res = sendResponse(1002, action='register')
                    return JsonResponse(res)

                query = f'''UPDATE public.t_user
                            SET is_verified=true
                            WHERE pid={pid[0]}  '''
                cur.execute(query)

                con.commit()
                res = sendResponse(200, action='register')
                return JsonResponse(res)
            except Exception as e:
                res = sendResponse(5004)
                return JsonResponse(res)
    else:
        res = sendResponse(405)
        return JsonResponse(res)
