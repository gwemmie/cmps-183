# These are the controllers for your ajax api.
# Tons of code in here was taken from lecture examples.

import requests
#from default import get_user_name_from_email
# ^That didn't work, so the function has to live in api.py instead

def get_user_name_from_email(email):
    """Returns a string corresponding to the user first and last names,
    given the user email."""
    u = db(db.auth_user.email == email).select().first()
    if u is None:
        return 'None'
    else:
        return ' '.join([u.first_name, u.last_name])

def get_posts():
    """This controller is used to get the posts.  Follow what we did in lecture 10, to ensure
    that the first time, we get 4 posts max, and each time the "load more" button is pressed,
    we load at most 4 more posts."""
    logged_in = auth.user_id is not None
    user_id = auth.user_id if auth.user_id else None
    user_email = auth.user.email if auth.user_id else None
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 3
    posts = []
    has_more = False
    rows = db().select(db.post.ALL, orderby=~db.post.created_on, limitby=(start_idx, end_idx + 1))
    for i, r in enumerate(rows):
        if i < end_idx - start_idx:
            p = dict(
                id=r.id,
                user_email = r.user_email,
                user_name = get_user_name_from_email(r.user_email),
                post_content = r.post_content,
                created_on = r.created_on,
                updated_on = r.updated_on,
                is_editing_post = False,
                is_mine = user_email == r.user_email
            )
            posts.append(p)
        else:
            has_more = True
    return response.json(dict(
        posts=posts,
        logged_in=logged_in,
        has_more=has_more
    ))


# Note that we need the URL to be signed, as this changes the db.
@auth.requires_signature()
def add_post():
    """Here you get a new post and add it.  Return what you want."""
    p_id = db.post.insert(post_content=request.vars.post_content)
    p = db.post(p_id)
    return response.json(dict(
        post=p,
        user_name = get_user_name_from_email(auth.user.email)
    ))


@auth.requires_signature()
def edit_post():
    """Used to edit a post."""
    p_id = db(db.post.id == request.vars.post_id).update(post_content=request.vars.post_content)
    p = db.post(request.vars.post_id)
    return response.json(dict(
        post=p,
        user_name = get_user_name_from_email(auth.user.email)
    ))


@auth.requires_signature()
def del_post():
    """Used to delete a post."""
    db(db.post.id == request.vars.post_id).delete()
    return "ok"

