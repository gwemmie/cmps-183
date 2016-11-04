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

    function get_posts_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return posts_url + "?" + $.param(pp);
    }

    self.get_posts = function () {
        $.getJSON(get_posts_url(0, 4), function (data) {
            self.vue.posts = data.posts;
            self.vue.logged_in = data.logged_in;
            self.vue.has_more = data.has_more;
        })
    };

    self.get_more_variable = function (amount) {
        var num_posts = self.vue.posts.length;
        $.getJSON(get_posts_url(num_posts, num_posts + amount), function (data) {
            self.vue.has_more = data.has_more;
            self.extend(self.vue.posts, data.posts);
        });
    }

    self.get_more = function () {
        self.vue.current_max += 4;
        return self.get_more_variable(4);
    };

    self.check_more = function() {
        if (self.vue.posts.length > self.vue.current_max) {
            self.vue.posts.pop();
            self.vue.has_more = true;
        } else if (self.vue.posts.length < self.vue.current_max) {
            self.get_more_variable(self.vue.current_max - self.vue.posts.length);
        }

    }

    self.add_post_button = function () {
        // The button to add a post has been pressed.
        if (self.vue.logged_in) self.vue.is_adding_post = !self.vue.is_adding_post;
        self.vue.form_post_content = "";
    };

    self.add_post = function () {
        // The submit button to add a post has been added.
        var date = Date.now();
        $.post(add_post_url,
            {
                post_content: self.vue.form_post_content
            },
            function (data) {
                $.web2py.enableElement($("#add-new-post-submit"));
                self.add_post_button();
                data.post.is_editing_post = false;
                data.post.is_mine = true;
                data.post.user_name = data.user_name;
                self.vue.posts.unshift(data.post);
                self.check_more();
            }
        );
    };

    self.edit_post_button_pressed = function (post_id) {
        // The button to edit a post has been pressed.
        if (self.vue.is_editing_post) return;
        var idx = self.get_post(post_id);
        if (idx > -1) {
            self.vue.posts[idx].is_editing_post = true;
            self.vue.form_post_content = self.vue.posts[idx].post_content;
            self.vue.is_editing_post = true;
        }
    };

    self.edit_post_button_unpressed = function (post_id) {
        // The button to edit a post has been unpressed.
        if (!self.vue.is_editing_post) return;
        self.vue.is_editing_post = false;
        var idx = self.get_post(post_id);
        if (idx > -1) {
            self.vue.posts[idx].is_editing_post = false;
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
                    post_content: self.vue.form_post_content
                },
                function (data) {
                    $.web2py.enableElement($("#edit-post-submit"));
                    self.vue.posts[idx].is_editing_post = false;
                    data.post.is_editing_post = false;
                    data.post.is_mine = true;
                    data.post.user_name = data.user_name;
                    self.vue.posts.splice(idx, 1, data.post);
                    self.vue.is_editing_post = false;
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
                    self.check_more();
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
            is_editing_post: false,
            posts: [],
            logged_in: false,
            current_max: 4,
            has_more: false,
            form_post_content: null
        },
        methods: {
            get_more: self.get_more,
            add_post_button: self.add_post_button,
            add_post: self.add_post,
            my_post: self.my_post,
            edit_post_button_pressed: self.edit_post_button_pressed,
            edit_post_button_unpressed: self.edit_post_button_unpressed,
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
