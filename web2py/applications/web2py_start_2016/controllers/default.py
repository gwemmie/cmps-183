# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

# -------------------------------------------------------------------------
# Sample shopping cart implementation.
# -------------------------------------------------------------------------

import traceback
import requests


@auth.requires_login()
def index():
    # Get list of products from teacher's server
    r = requests.get("http://luca-teaching.appspot.com/get_products")
    products = r.json()['products']
    # Sample code from teacher that may come in handy
    #for p in products['products']:
    #    p.desired_quantity = min(1, p.quantity)
    #    p.cart_quantity = 0
    return response.json(dict(products=products))


"""
Gets the list of products, possibly in response to a query.
Probably not needed for this assignment.
def get_products():
    t = request.vars.q.strip()
    if request.vars.q:
        q = ((db.product.name.contains(t)) |
             (db.product.description.contains(t)))
    else:
        q = db.product.id > 0
    products = db(q).select(db.product.ALL)
    # Fixes some fields, to make it easy on the client side.
    for p in products:
        p.image_url = URL('download', p.image)
        p.desired_quantity = min(1, p.quantity)
        p.cart_quantity = 0
    return response.json(dict(
        products=products,
    ))
"""


"""
Ajax function called when a customer orders and pays for the cart.
Probably not needed for this assignment.
def purchase():
    if not URL.verify(request, hmac_key=session.hmac_key):
        raise HTTP(500)
    # Creates the charge.
    import stripe
    # Your secret key.
    stripe.api_key = myconf.get('stripe.private_key')
    token = json.loads(request.vars.transaction_token)
    amount = float(request.vars.amount)
    try:
        charge = stripe.Charge.create(
            amount=int(amount * 100),
            currency="usd",
            source=token['id'],
            description="Purchase",
        )
    except stripe.error.CardError as e:
        logger.info("The card has been declined.")
        logger.info("%r" % traceback.format_exc())
        return "nok"
    db.customer_order.insert(
        customer_info=request.vars.customer_info,
        transaction_token=json.dumps(token),
        cart=request.vars.cart)
    return "ok"
"""


"""
Function for product management.
Probably not needed for this assignment.
# Normally here we would check that the user is an admin, and do programmatic
# APIs to add and remove products to the inventory, etc.
@auth.requires_login()
def product_management():
    q = db.product # This queries for all products.
    form = SQLFORM.grid(
        q,
        editable=True,
        create=True,
        user_signature=True,
        deletable=True,
        fields=[db.product.product_name, db.product.quantity, db.product.price,
                db.product.image],
        details=True,
    )
    return dict(form=form)
"""


@auth.requires_login()
def view_orders():
    q = db.customer_order # This queries for all products.
    db.customer_order.customer_info.represent = lambda v, r: nicefy(v)
    db.customer_order.transaction_token.represent = lambda v, r: nicefy(v)
    db.customer_order.cart.represent = lambda v, r: nicefy(v)
    form = SQLFORM.grid(
        q,
        editable=True,
        create=True,
        user_signature=True,
        deletable=True,
        details=True,
    )
    return dict(form=form)


def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())


@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()


