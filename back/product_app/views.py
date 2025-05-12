from product_pro.settings import sendResponse, connectDB, disconnectDB
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


def resumeAll(request):

    jsons = json.loads(request.body)
    action = jsons['action']
    try:
        pid = jsons["pid"]
    except Exception as e:
        data = [{"error": str(e) + " key error"}]
        result = sendResponse(404, data, action)
        return result
    try:
        myCon = connectDB()
        cursor = myCon.cursor()
        query = F"""SELECT
                          pid, firstname, lastname, headline, address, phone, email, linkedin, github, facebook, summary
                    FROM whois.t_person_details
                    WHERE pid={pid}  """
        cursor.execute(query)
        columns = cursor.description
        respRow = [{"personal_details": {columns[index][0]: column
                                         for index, column in enumerate(value)} for value in cursor.fetchall()}]
        respRow[0]["summary"] = respRow[0]["personal_details"]["summary"]
        # personal_details

        query = F"""SELECT eduid, d.degree, e."degreeName", institution, location, start_year, graduation_year, description, pid,d.did
                        FROM whois.t_education e
                        INNER JOIN whois.t_degree d ON d.did=e.did
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["education"] = [{columns[index][0]: column
                                    for index, column in enumerate(value)} for value in cursor.fetchall()]
        # education

        query = F"""SELECT expid, pid, jid, company, location, start_date, end_date
                        FROM whois.t_experience
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["experience"] = [{columns[index][0]: column
                                    for index, column in enumerate(value)} for value in cursor.fetchall()]
        # experience

        countExperience = len(respRow[0]['experience'])
        if countExperience > 0:
            expid = respRow[0]['experience'][0]['expid']
            query = f'''SELECT * FROM whois.t_exp_respons
                        where expid={expid}
                '''
            cursor.execute(query)
            columns = cursor.description
            respRow[0]["experience"][0]['responsibilities'] = [{columns[index][0]: column
                                                                for index, column in enumerate(value)} for value in cursor.fetchall()]

        # # responsibilities

        query = F"""SELECT sid, lp.profid, skill, pid, lp.proficiency
                    FROM whois.t_skills s
                    INNER JOIN whois.t_proficiency lp ON lp.profid=s.profid
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["skills"] = [{columns[index][0]: column
                                 for index, column in enumerate(value)} for value in cursor.fetchall()]
        # skills

        query = F"""SELECT  cid, pid, name, institution, year
                        FROM whois.t_certifications
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["certifications"] = [{columns[index][0]: column
                                         for index, column in enumerate(value)} for value in cursor.fetchall()]
        # certifications

        query = F"""SELECT projid, pid, name, description, url
                            FROM whois.t_projects
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["projects"] = [{columns[index][0]: column
                                   for index, column in enumerate(value)} for value in cursor.fetchall()]
        # projectss

        query = F"""SELECT lid, pid, language, lp.profid, lp.proficiency
                        FROM whois.t_languages l
                        INNER JOIN whois.t_proficiency lp ON lp.profid  =l.profid
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["languages"] = [{columns[index][0]: column
                                   for index, column in enumerate(value)} for value in cursor.fetchall()]
        # languages

        query = F"""SELECT hid, hobbies, pid
                            FROM whois.t_hobbies
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["hobbies"] = [{columns[index][0]: column
                                  for index, column in enumerate(value)} for value in cursor.fetchall()]
        # # hobbies

        cursor.close()
        disconnectDB(myCon)

        data = respRow
        result = sendResponse(200, data, action)

        return result
    except Exception as e:
        data = [{"query error": str(e)}]
        result = sendResponse(404, data, action)
        return result
    # resumeAll


def deleteProduct(request):
    data = json.loads(request.body)
    try:
        id = data['id']
        with connectDB() as con:
            cur = con.cursor()
            query = f'''DELETE FROM public.products WHERE id={id}'''
            cur.execute(query)
            con.commit()

            res = sendResponse(200)
            return res
    except Exception as e:
        res = sendResponse(4004)
        return res
# deleteProduct


def resumeOne(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    try:
        pid = jsons["pid"]
    except Exception as e:
        data = [{"error": str(e) + " key error"}]
        result = sendResponse(404, data, action)
        return result
    try:
        myCon = connectDB()
        cursor = myCon.cursor()
        query = F"""SELECT
                          pid, firstname, lastname, headline, address, phone, email, linkedin, github, facebook, summary, city,img
                    FROM whois.t_person_details
                    WHERE pid={pid}  """
        cursor.execute(query)
        columns = cursor.description
        respRow = [{"personal_details": {columns[index][0]: column
                                         for index, column in enumerate(value)} for value in cursor.fetchall()}]
        respRow[0]["summary"] = respRow[0]["personal_details"]["summary"]
        # personal_details

        query = F"""SELECT eduid, d.degree, e."degreeName", institution, location, start_year, graduation_year, description, pid,d.did
                        FROM whois.t_education e
                        INNER JOIN whois.t_degree d ON d.did=e.did
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["education"] = [{columns[index][0]: column
                                    for index, column in enumerate(value)} for value in cursor.fetchall()]
        # education

        query = F"""SELECT expid, pid, jid, company, location, start_date, end_date
                        FROM whois.t_experience
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["experience"] = [{columns[index][0]: column
                                    for index, column in enumerate(value)} for value in cursor.fetchall()]
        # experience

        countExperience = len(respRow[0]['experience'])
        if countExperience > 0:
            expid = respRow[0]['experience'][0]['expid']
            query = f'''SELECT * FROM whois.t_exp_respons
                        where expid={expid}
                '''
            cursor.execute(query)
            columns = cursor.description
            respRow[0]["experience"][0]['responsibilities'] = [{columns[index][0]: column
                                                                for index, column in enumerate(value)} for value in cursor.fetchall()]

        # # responsibilities

        query = F"""SELECT sid, lp.profid, skill, pid, lp.proficiency
                    FROM whois.t_skills s
                    INNER JOIN whois.t_proficiency lp ON lp.profid=s.profid
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["skills"] = [{columns[index][0]: column
                                 for index, column in enumerate(value)} for value in cursor.fetchall()]
        # skills

        query = F"""SELECT  cid, pid, name, institution, year
                        FROM whois.t_certifications
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["certifications"] = [{columns[index][0]: column
                                         for index, column in enumerate(value)} for value in cursor.fetchall()]
        # certifications

        query = F"""SELECT projid, pid, name, description, url
                            FROM whois.t_projects
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["projects"] = [{columns[index][0]: column
                                   for index, column in enumerate(value)} for value in cursor.fetchall()]
        # projectss

        query = F"""SELECT lid, pid, language, lp.profid, lp.proficiency
                        FROM whois.t_languages l
                        INNER JOIN whois.t_proficiency lp ON lp.profid  =l.profid
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["languages"] = [{columns[index][0]: column
                                   for index, column in enumerate(value)} for value in cursor.fetchall()]
        # languages

        query = F"""SELECT hid, hobbies, pid
                            FROM whois.t_hobbies
                    WHERE pid={pid}"""
        cursor.execute(query)
        columns = cursor.description
        respRow[0]["hobbies"] = [{columns[index][0]: column
                                  for index, column in enumerate(value)} for value in cursor.fetchall()]
        # # hobbies

        cursor.close()
        disconnectDB(myCon)

        data = respRow
        result = sendResponse(200, data, action)

        return result
    except Exception as e:
        data = [{"query error": str(e)}]
        result = sendResponse(404, data, action)
        return result

    # resumeOne


@csrf_exempt
def checkService(request):
    if request.method == 'POST':
        if request.content_type.startswith("multipart/form-data"):
            action = request.POST.get('action')
            print(f"##################action: ${action}")
            if not action:
                res = sendResponse(4009)
                return JsonResponse(res)
            if action == 'updateResume':
                result = updateResume(request)
                return JsonResponse(result)
            else:
                result = sendResponse(4003)
                return JsonResponse(result)
        else:

            try:
                data = json.loads(request.body)
            except:
                res = sendResponse(4001)
                return JsonResponse(res)

        if "action" not in data:
            res = sendResponse(4002)
            return JsonResponse(res)

        action = data['action']
        if action == 'resumeAll':
            result = resumeAll(request)
            return JsonResponse(result)
        if action == 'resumeOne':
            result = resumeOne(request)
            return JsonResponse(result)
        else:
            result = sendResponse(4003)
            return JsonResponse(result)
    else:
        res = sendResponse(4000)
        return JsonResponse(res)


def updateResume(request):
    try:
        img = request.FILES.get('img')
        pid = request.POST.get('pid')
        if not pid:
            return sendResponse(4006)
        firstname = request.POST.get('firstname', None)
        lastname = request.POST.get('lastname', None)
        headline = request.POST.get('headline', None)
        address = request.POST.get('address', None)
        phone = request.POST.get('phone', None)
        linkedin = request.POST.get('linkedin', None)
        github = request.POST.get('github', None)
        facebook = request.POST.get('facebook', None)
        city = request.POST.get('city', None)
        summary = request.POST.get('summary', None)
    except Exception as e:
        data = [{"error": str(e)}]
        result = sendResponse(404, data, "updateResume")
        return result
    try:
        if img:
            image_name = img.name

            # Зургийг хадгалах
            image_path = default_storage.save(
                f'images/{image_name}', ContentFile(img.read()))

            # Хадгалсан зургийн URL буцаах
            image_url = default_storage.url(image_path)

            zuragZam = f'http://127.0.0.1:8000{image_url}'

        with connectDB() as con:
            cur = con.cursor()
            query = f'''UPDATE whois.t_person_details
                                SET
                                    firstname = %s,
                                    lastname = %s,
                                    headline = %s,
                                    address = %s,
                                    phone = %s,
                                    linkedin = %s,
                                    github = %s,
                                    facebook = %s,
                                    summary = %s,
                                    img = %s,
                                    city = %s
                                WHERE pid = %s;  
                            '''
            params = (firstname, lastname, headline, address,
                      phone, linkedin, github, facebook, summary, zuragZam, city, pid)
            cur.execute(query, params)
            con.commit()
        return sendResponse(200)
    except Exception as e:
        print(f'###################{e}')
        return sendResponse(4005)
# updateResume
