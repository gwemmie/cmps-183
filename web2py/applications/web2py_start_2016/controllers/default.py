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
    for p in products['products']:
        p.desired_quantity = min(1, p.quantity)
        p.cart_quantity = 0
    return response.json(dict(products=products))


"""Ajax function called when a customer orders and pays for the cart."""
def purchase():
    if not URL.verify(request, hmac_key=session.hmac_key):
        raise HTTP(500)
    db.orders.insert(
        user=request.vars.user,
        amount=request.vars.amount,
        cart=request.vars.cart)
    return "ok"


@auth.requires_login()
def view_orders():
    q = db(db.orders.user == auth.user.email).select()
    db.orders.amount.represent = lambda v, r: nicefy(v)
    db.orders.cart.represent = lambda v, r: nicefy(v)
    form = SQLFORM.grid(
        q,
        editable=True,
        create=True,
        user_signature=True,
        deletable=True,
        details=True,
    )
    return response.json(dict(form=form, user=auth.user.email))


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


