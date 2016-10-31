# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

# -------------------------------------------------------------------------
# This is a sample controller
# - index is the default action of any application
# - user is required for authentication and authorization
# - download is for downloading files uploaded in the db (does streaming)
# -------------------------------------------------------------------------

def index():
    """
    This is your main controller.  Here you do almost nothing; you just cause index.html to be served.
    """
    return dict()


@auth.requires_login()
def edit():
    """
    This is the page to create / edit / delete a post.
    """
    if not request.args:
        form=SQLFORM(db.post)
    else:
        post = db.post[long(request.args[0])]
        if post is None:
            return dict(page='No post by id ' + str(request.args[0]) + ' exists.')
        elif not auth.user_id or auth.user.email != post.user_email:
            return dict(page='You are not allowed to edit post ' + str(post.id) + ' because it belongs to another user.')
        else:
            form=SQLFORM(db.post, post.id, deletable=True)
            form.add_button('Cancel', URL('default', 'index'))
    if form.process().accepted:
        session.flash = T('Post added/edited.')
        redirect(URL('default', 'index'))
    return dict(page=form)


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


