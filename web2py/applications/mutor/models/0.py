from gluon.storage import Storage
settings = Storage()

settings.migrate = True
settings.title = 'M\xc2\xb5tor'
settings.subtitle = 'powered by web2py'
settings.author = 'Team Mutor'
settings.author_email = 'jimijames.bove@gmail.com'
settings.keywords = 'music tutor learn'
settings.description = 'Learn music theory in a fun and easy way.'
settings.layout_theme = 'Default'
settings.database_uri = 'sqlite://storage.sqlite'
settings.security_key = '600801c4-60cb-45ec-b1c2-676b83836492'
settings.email_server = 'mutor.org'
settings.email_sender = 'admin@mutor.org'
settings.email_login = 'admin:music'
settings.login_method = 'local'
settings.login_config = ''
settings.plugins = []
