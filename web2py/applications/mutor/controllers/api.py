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


def get_profiles():
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0
    profiles = []
    rows = db(db.profiles.user_name == get_user_name_from_email(get_user_email())).select()
    for i, r in enumerate(rows):
        if i < end_idx - start_idx:
            t = dict(
                id=r.id,
                lessons_completed=r.lessons_completed,
                user_email=r.user_email,
                user_name=r.user_name,
                created_on=r.created_on
            )
            profiles.append(t)
    logged_in = auth.user_id is not None
    return response.json(dict(profiles=profiles, logged_in = logged_in,))

# Note that we need the URL to be signed, as this changes the db.
@auth.requires_signature()
def add_completion():
    """Here you get a new post and add it.  Return what you want."""
    # Implement me!
    p_id = db.profiles.insert(
        lessons_completed=request.vars.lessons_completed,
    )
    p = db.profiles(p_id)
    return response.json(dict(profiles=p))


def index():
    pass

