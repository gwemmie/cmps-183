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


"""retrieve users profile info and the lessons they have completed"""
def get_profiles():
    profiles = []
    rows = db(db.profile.user_name == get_user_name_from_email(get_user_email())).select()
    for i, r in enumerate(rows):
        t = dict(
            id=r.id,
            lessons_completed=r.lessons_completed
        )
        profiles.append(t)
    print profiles
    return response.json(dict(profiles=profiles))


def index():
    return dict()


def error():
    return dict()

