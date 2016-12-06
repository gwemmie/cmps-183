# -*- coding: utf-8 -*-

### required - do no delete
def user(): return dict(form=auth())
def download(): return response.download(request,db)
def call(): return service()
### end requires


def get_user_email():
    return auth.user.email if auth.user else None


def get_user_name_from_email(email):
    """Returns a string corresponding to the user first and last names,
    given the user email."""
    u = db(db.auth_user.email == email).select().first()
    if u is None:
        return 'None'
    else:
        return ' '.join([u.first_name, u.last_name])


def index():
    return dict()


def error():
    return dict()

@auth.requires_login()
def prof():
    return dict()

