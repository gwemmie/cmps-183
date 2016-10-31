// This is the js for the default/index.html view.
// Tons of code in here was taken from lecture examples.

var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    // Makes sure that a post exists, given its id
    self.get_post = function (post_id) {
        var idx = -1;
        for (var i = 0; i < self.vue.posts.length; i++) {
            if (self.vue.posts[i].id === post_id) {
                idx = i;
                break;
            }
        }
        return idx; // error code would be -1: post not found
    }

    // Makes sure current user is allowed to edit/delete post
    self.my_post = function (post_id) {
        var idx = self.get_post(post_id);
        if (idx != -1 && self.vue.posts[idx].user_email == self.vue.user_email) {
            return true;
        }
        return false;
    }

    function get_posts_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return posts_url + "?" + $.param(pp);
    }

    self.get_posts = function () {
        $.getJSON(get_posts_url(0, 3), function (data) {
            self.vue.posts = data.posts;
            self.vue.logged_in = data.logged_in;
            self.vue.has_more = data.has_more;
            self.vue.user_id = data.user_id;
            self.vue.user_email = data.user_email;
        })
    };

    self.get_more = function () {
        var num_posts = self.vue.posts.length;
        $.getJSON(get_posts_url(num_posts, num_posts + 3), function (data) {
            self.vue.has_more = data.has_more;
            self.extend(self.vue.posts, data.posts);
        });
    };

    self.add_post_button = function () {
        // The button to add a post has been pressed.
        self.vue.is_adding_post = !self.vue.is_adding_post;
    };

    self.add_post = function () {
        // The submit button to add a post has been added.
        var date = Date.now();
        $.post(add_post_url,
            {
                user_email: self.vue.user_email,
                post_content: self.vue.form_post_content,
                created_on: date,
                updated_on: date
            },
            function (data) {
                $.web2py.enableElement($("#add-new-post-submit"));
                self.vue.posts.unshift(data.post);
            });
    };

    self.edit_post_button = function (post_id) {
        // The button to edit a post has been pressed.
        var idx = self.get_post(post_id);
        if (idx > -1) {
            self.vue.posts[idx].is_editing_post = !self.vue.posts[idx].is_editing_post;
        }
    };

    self.edit_post = function (post_id) {
        // The submit button to edit a post has been added.
        var idx = self.get_post(post_id);
        if (idx > -1) {
            var created_on_original = self.vue.posts[idx].created_on;
            var date = Date.now();
            $.post(edit_post_url,
                {
                    post_id: post_id,
                    // Bug/feature: if one ever disables the check that
                    // post_id belongs to the current user, editing will
                    // overwrite that post's email with the new editer's
                    // because I decided to not get user_email from the
                    // original self.vue.posts[idx].user_email.
                    user_email: self.vue.user_email,
                    post_content: self.vue.form_post_content,
                    created_on: created_on_original,
                    updated_on: date
                },
                function (data) {
                    $.web2py.enableElement($("#edit-post-submit"));
                    self.vue.posts.splice(idx, 1, data.post);
                }
            );
        }
    };

    self.delete_post = function (post_id) {
        $.post(del_post_url,
            {
                post_id: post_id
            },
            function () {
                var idx = self.get_post(post_id);
                if (idx > -1) {
                    self.vue.posts.splice(idx, 1);
                }
            }
        )
    };

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            is_adding_post: false,
            posts: [],
            logged_in: false,
            has_more: false,
            user_id: null,
            user_email: null,
            form_post_content: null
        },
        methods: {
            get_more: self.get_more,
            add_post_button: self.add_post_button,
            add_post: self.add_post,
            my_post: self.my_post,
            edit_post_button: self.edit_post_button,
            edit_post: self.edit_post,
            delete_post: self.delete_post
        }

    });

    self.get_posts();
    $("#vue-div").show();


    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
