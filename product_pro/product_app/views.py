from product_pro.settings import sendResponse, connectDB
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt


def product():
    try:
        with connectDB() as con:
            cur = con.cursor()
            query = f'''SELECT p.id as id,
                            p.name as name,
                            c.name as category,
                            p.quantity as quantity,
                            p.price as price,
                            s.name as supplier,
                            sa.quantity  as sales,
                            p.category_id as category_id
                            FROM public.products as p
                        LEFT JOIN public.categories as c on c.id=p.category_id
                        LEFT JOIN public.suppliers as s on s.id=p.supplier_id
                        LEFT JOIN public.sales as sa on sa.product_id=p.id
                        '''
            cur.execute(query)
            columns = cur.description
            respRow = {}
            respRow['products'] = [{columns[index][0]: column for index,
                                    column in enumerate(value)} for value in cur.fetchall()]
            # products

            query = '''SELECT id, name FROM public.categories'''
            cur.execute(query)
            categories = [{"id": row[0], "name": row[1]}
                          for row in cur.fetchall()]
            respRow['categories'] = categories
            # categories

            query = f'''SELECT s.id as id,
                                p.name as name,
                                s.quantity as quantity,
                                s.sale_date as sale_date,
                                s.total_price as total_price
                                FROM public.sales as s
                        INNER JOIN public.products as p on p.id=s.product_id
                        
                        '''
            cur.execute(query)
            columns = cur.description
            respRow['sales'] = [{columns[index][0]: column for index,
                                 column in enumerate(value)} for value in cur.fetchall()]
            # sales

            result = sendResponse(200, [respRow], action='product')
            return result
    except:
        res = sendResponse(4005)
        return res
# product

# SELECT s.id as id,
# 		p.name as name,
# 		s.quantity as quantity,
# 		s.sale_date as sale_date,
# 		s.total_price as total_price
# 		FROM public.sales as s
# INNER JOIN public.products as p on p.id=s.product_id


def addProduct(request):
    data = json.loads(request.body)
    try:
        name = data['name']
        category_id = data['category_id']
        quantity = data['quantity']
        price = data['price']
    except:
        res = sendResponse(4004)
        return res

    try:
        with connectDB() as con:
            cur = con.cursor()
            query = f'''INSERT INTO public.products(
                        name, category_id, quantity, price)
                        VALUES ('{name}', {category_id}, {quantity}, {price});'''
            cur.execute(query)
            con.commit()

            res = sendResponse(200)
            return res
    except Exception as e:
        res = sendResponse(4005)
        return res
# addProduct


def updateProduct(request):
    data = json.loads(request.body)
    try:
        id = data['id']
        category_id = data['category_id']
        quantity = data['quantity']
        price = data['price']
        name = data['name']
    except Exception as e:
        res = sendResponse(4004)
        return res

    try:
        with connectDB() as con:
            cur = con.cursor()
            query = f'''UPDATE public.products
                        SET name='{name}', category_id={category_id},
                              quantity={quantity}, price={price}
                        WHERE id={id};'''
            cur.execute(query)
            con.commit()
            jsonRes = {
                "id": id,
                "category_id": category_id,
                "quantity": quantity,
                "price": price,
                "name": name
            }

            res = sendResponse(200, [jsonRes])
            return res
    except Exception as e:
        res = sendResponse(4005)
        return res
# updateProduct


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


@csrf_exempt
def productCheckService(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except:
            res = sendResponse(4001)
            return JsonResponse(res)

        if "action" not in data:
            res = sendResponse(4002)
            return JsonResponse(res)

        action = data['action']
        if action == 'product':
            result = product()
            return JsonResponse(result)
        elif action == 'addProduct':
            result = addProduct(request)
            return JsonResponse(result)
        elif action == 'updateProduct':
            result = updateProduct(request)
            return JsonResponse(result)
        elif action == 'deleteProduct':
            result = deleteProduct(request)
            return JsonResponse(result)
        else:
            result = sendResponse(4003)
            return JsonResponse(result)
    else:
        res = sendResponse(4000)
        return JsonResponse(res)
