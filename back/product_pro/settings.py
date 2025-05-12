

from pathlib import Path
from datetime import datetime
import psycopg2
from email.mime.text import MIMEText
import smtplib
import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ncnqth(t!tf0=(b6q!gr9=4ni1xv=n-d$%5d_mq*yj@$h-*xgn'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'product_app',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = 'product_pro.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'product_pro.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


def connectDB():
    con = psycopg2.connect(
        # host='192.168.0.15',  # dotood
        host='59.153.86.254',  # gadaad
        dbname='qrlesson',
        user='userlesson',
        password='123',
        port='5938',
    )
    return con
# connectDB


def disconnectDB(con):
    con.close()
# disconnectDB


def sendResponse(statusCode, data=[], action=None):
    resJson = {}
    resJson['action'] = action
    resJson['resultCode'] = statusCode
    resJson['resultMessage'] = statusMessage[statusCode]
    resJson['data'] = data
    resJson['size'] = len(data)
    resJson['curDate'] = datetime.now().strftime('%Y/%m/%d %T')
    return resJson


statusMessage = {
    1000: 'Бүртгэлтэй хэрэглэгч байна',
    1001: 'Token-ний хугацаа дууссан эсвэл хүчингүй token байна',
    1002: 'Баталгаажсан хэрэглэгч байна',
    1004: 'Бүртгэлгүй хэрэглэгч байна',

    200: 'Success',
    204: 'No Content',
    301: "Bad request",

    404: "Not found",
    4000: 'Invalid Method',
    4001: 'Invalid Json',
    4002: 'Action Missing',
    4003: 'Invalid Action',
    4004: 'Key дутуу',
    4005: 'Database Error',
    4006: '`pid` байхгүй байна',
    4007: 'Password буруу байна',
    4008: 'Бүртгэлээ баталгаажуулна уу',
    4009: 'Action key байхнүй байна',

    5000: 'Server Error',
    5004: 'Register Service дотоод алдаа',
}


def sendMail(recipient, subj, bodyHtml):
    sender_email = "testmail@mandakh.edu.mn"
    sender_password = "Mandakh2"
    recipient_email = recipient
    subject = subj
    body = bodyHtml

    html_message = MIMEText(body, 'html')
    html_message['Subject'] = subject
    html_message['From'] = sender_email
    html_message['To'] = recipient_email
    with smtplib.SMTP('smtp-mail.outlook.com', 587) as server:
        server.ehlo()
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email,
                        html_message.as_string())
        server.quit()
# sendMail
