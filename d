[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex 38e6538..1c0e1cf 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -8,7 +8,9 @@[m
       "name": "vite-project",[m
       "version": "0.0.0",[m
       "dependencies": {[m
[31m-        "firebase": "^10.13.1",[m
[32m+[m[32m        "@fortawesome/free-solid-svg-icons": "^6.6.0",[m
[32m+[m[32m        "@fortawesome/react-fontawesome": "^0.2.2",[m
[32m+[m[32m        "framer-motion": "^11.5.4",[m
         "jwt-decode": "^4.0.0",[m
         "lucide": "^0.433.0",[m
         "lucide-react": "^0.438.0",[m
[36m@@ -555,537 +557,51 @@[m
         "node": "^18.18.0 || ^20.9.0 || >=21.1.0"[m
       }[m
     },[m
[31m-    "node_modules/@firebase/analytics": {[m
[31m-      "version": "0.10.7",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/analytics/-/analytics-0.10.7.tgz",[m
[31m-      "integrity": "sha512-GE29uTT6y/Jv2EP0OjpTezeTQZ5FTCTaZXKrrdVGjb/t35AU4u/jiU+hUwUPpuK8fqhhiHkS/AawE3a3ZK/a9Q==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/installations": "0.6.8",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/analytics-compat": {[m
[31m-      "version": "0.2.13",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/analytics-compat/-/analytics-compat-0.2.13.tgz",[m
[31m-      "integrity": "sha512-aZ4wGfNDMsCxhKzDbK2g1aV0JKsdQ9FbeIsjpNJPzhahV0XYj+z36Y4RNLPpG/6hHU4gxnezxs+yn3HhHkNL8w==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/analytics": "0.10.7",[m
[31m-        "@firebase/analytics-types": "0.8.2",[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-compat": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/analytics-types": {[m
[31m-      "version": "0.8.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/analytics-types/-/analytics-types-0.8.2.tgz",[m
[31m-      "integrity": "sha512-EnzNNLh+9/sJsimsA/FGqzakmrAUKLeJvjRHlg8df1f97NLUlFidk9600y0ZgWOp3CAxn6Hjtk+08tixlUOWyw=="[m
[31m-    },[m
[31m-    "node_modules/@firebase/app": {[m
[31m-      "version": "0.10.10",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/app/-/app-0.10.10.tgz",[m
[31m-      "integrity": "sha512-sDqkdeFdVn5uygQm5EuIKOQ6/wxTcX/qKfm0MR46AiwLRHGLCDUMrXBkc8GhkK3ca2d6mPUSfPmndggo43D6PQ==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "idb": "7.1.1",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/app-check": {[m
[31m-      "version": "0.8.7",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/app-check/-/app-check-0.8.7.tgz",[m
[31m-      "integrity": "sha512-EkOeJcMKVR0zZ6z/jqcFTqHb/xq+TVIRIuBNGHdpcIuFU1czhSlegvqv2+nC+nFrkD8M6Xvd3tAlUOkdbMeS6A==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/app-check-compat": {[m
[31m-      "version": "0.3.14",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/app-check-compat/-/app-check-compat-0.3.14.tgz",[m
[31m-      "integrity": "sha512-kK3bPfojAfXE53W+20rxMqIxrloFswXG9vh4kEdYL6Wa2IB3sD5++2dPiK3yGxl8oQiqS8qL2wcKB5/xLpEVEg==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/app-check": "0.8.7",[m
[31m-        "@firebase/app-check-types": "0.5.2",[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-compat": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/app-check-interop-types": {[m
[31m-      "version": "0.3.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/app-check-interop-types/-/app-check-interop-types-0.3.2.tgz",[m
[31m-      "integrity": "sha512-LMs47Vinv2HBMZi49C09dJxp0QT5LwDzFaVGf/+ITHe3BlIhUiLNttkATSXplc89A2lAaeTqjgqVkiRfUGyQiQ=="[m
[31m-    },[m
[31m-    "node_modules/@firebase/app-check-types": {[m
[31m-      "version": "0.5.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/app-check-types/-/app-check-types-0.5.2.tgz",[m
[31m-      "integrity": "sha512-FSOEzTzL5bLUbD2co3Zut46iyPWML6xc4x+78TeaXMSuJap5QObfb+rVvZJtla3asN4RwU7elaQaduP+HFizDA=="[m
[31m-    },[m
[31m-    "node_modules/@firebase/app-compat": {[m
[31m-      "version": "0.2.40",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/app-compat/-/app-compat-0.2.40.tgz",[m
[31m-      "integrity": "sha512-2L5MW4MH2ya7Wvw0hzWy3ZWeB4SqC5gYXDAV5AS1lBTL4zL3k8dsqJmry/cFV00GgkCI01WJbcXvFMCXJvgyow==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/app": "0.10.10",[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/app-types": {[m
[31m-      "version": "0.9.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/app-types/-/app-types-0.9.2.tgz",[m
[31m-      "integrity": "sha512-oMEZ1TDlBz479lmABwWsWjzHwheQKiAgnuKxE0pz0IXCVx7/rtlkx1fQ6GfgK24WCrxDKMplZrT50Kh04iMbXQ=="[m
[31m-    },[m
[31m-    "node_modules/@firebase/auth": {[m
[31m-      "version": "1.7.8",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/auth/-/auth-1.7.8.tgz",[m
[31m-      "integrity": "sha512-1KJlDrTrEEFTIBj9MxjAWjQ4skecBD4bmoayQ0l14QDbNc1a8qGbi+MFSJkH7O6VnGE6bTMcWSw6RrQNecqKaw==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0",[m
[31m-        "undici": "6.19.7"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app": "0.x",[m
[31m-        "@react-native-async-storage/async-storage": "^1.18.1"[m
[31m-      },[m
[31m-      "peerDependenciesMeta": {[m
[31m-        "@react-native-async-storage/async-storage": {[m
[31m-          "optional": true[m
[31m-        }[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/auth-compat": {[m
[31m-      "version": "0.5.13",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/auth-compat/-/auth-compat-0.5.13.tgz",[m
[31m-      "integrity": "sha512-rV6TMxUU6wBBZ2ouDMtjJsJXeewtvYvVzslzt3/P7O/kxiWlreHT/2M/1guMiXKo3zk52XK3GqP0uM2bN7fEow==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/auth": "1.7.8",[m
[31m-        "@firebase/auth-types": "0.12.2",[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0",[m
[31m-        "undici": "6.19.7"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-compat": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/auth-interop-types": {[m
[31m-      "version": "0.2.3",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/auth-interop-types/-/auth-interop-types-0.2.3.tgz",[m
[31m-      "integrity": "sha512-Fc9wuJGgxoxQeavybiuwgyi+0rssr76b+nHpj+eGhXFYAdudMWyfBHvFL/I5fEHniUM/UQdFzi9VXJK2iZF7FQ=="[m
[31m-    },[m
[31m-    "node_modules/@firebase/auth-types": {[m
[31m-      "version": "0.12.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/auth-types/-/auth-types-0.12.2.tgz",[m
[31m-      "integrity": "sha512-qsEBaRMoGvHO10unlDJhaKSuPn4pyoTtlQuP1ghZfzB6rNQPuhp/N/DcFZxm9i4v0SogjCbf9reWupwIvfmH6w==",[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-types": "0.x",[m
[31m-        "@firebase/util": "1.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/component": {[m
[31m-      "version": "0.6.8",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/component/-/component-0.6.8.tgz",[m
[31m-      "integrity": "sha512-LcNvxGLLGjBwB0dJUsBGCej2fqAepWyBubs4jt1Tiuns7QLbXHuyObZ4aMeBjZjWx4m8g1LoVI9QFpSaq/k4/g==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/database": {[m
[31m-      "version": "1.0.7",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/database/-/database-1.0.7.tgz",[m
[31m-      "integrity": "sha512-wjXr5AO8RPxVVg7rRCYffT7FMtBjHRfJ9KMwi19MbOf0vBf0H9YqW3WCgcnLpXI6ehiUcU3z3qgPnnU0nK6SnA==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/app-check-interop-types": "0.3.2",[m
[31m-        "@firebase/auth-interop-types": "0.2.3",[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "faye-websocket": "0.11.4",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/database-compat": {[m
[31m-      "version": "1.0.7",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/database-compat/-/database-compat-1.0.7.tgz",[m
[31m-      "integrity": "sha512-R/3B+VVzEFN5YcHmfWns3eitA8fHLTL03io+FIoMcTYkajFnrBdS3A+g/KceN9omP7FYYYGTQWF9lvbEx6eMEg==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/database": "1.0.7",[m
[31m-        "@firebase/database-types": "1.0.4",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/database-types": {[m
[31m-      "version": "1.0.4",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/database-types/-/database-types-1.0.4.tgz",[m
[31m-      "integrity": "sha512-mz9ZzbH6euFXbcBo+enuJ36I5dR5w+enJHHjy9Y5ThCdKUseqfDjW3vCp1YxE9zygFCSjJJ/z1cQ+zodvUcwPQ==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/app-types": "0.9.2",[m
[31m-        "@firebase/util": "1.9.7"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/firestore": {[m
[31m-      "version": "4.7.1",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/firestore/-/firestore-4.7.1.tgz",[m
[31m-      "integrity": "sha512-WliQNa8GVcH6EWkH0NAf+uAnxNiBuH+G8Buzr2ZS1NznOhJDK/q6Hsjv5TzNrijLTAdEfj/wk9VEv994KDSjxg==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "@firebase/webchannel-wrapper": "1.0.1",[m
[31m-        "@grpc/grpc-js": "~1.9.0",[m
[31m-        "@grpc/proto-loader": "^0.7.8",[m
[31m-        "tslib": "^2.1.0",[m
[31m-        "undici": "6.19.7"[m
[31m-      },[m
[32m+[m[32m    "node_modules/@fortawesome/fontawesome-common-types": {[m
[32m+[m[32m      "version": "6.6.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@fortawesome/fontawesome-common-types/-/fontawesome-common-types-6.6.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-xyX0X9mc0kyz9plIyryrRbl7ngsA9jz77mCZJsUkLl+ZKs0KWObgaEBoSgQiYWAsSmjz/yjl0F++Got0Mdp4Rw==",[m
[32m+[m[32m      "license": "MIT",[m
       "engines": {[m
[31m-        "node": ">=10.10.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/firestore-compat": {[m
[31m-      "version": "0.3.36",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/firestore-compat/-/firestore-compat-0.3.36.tgz",[m
[31m-      "integrity": "sha512-NtoIm7CT9f+SFB7cPMCtyCSxZReh/+SII5X4TQH394S3dwhru9HIfvEOKAMuAnXsSsLH72jXPUgdsEAUqg6Oug==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/firestore": "4.7.1",[m
[31m-        "@firebase/firestore-types": "3.0.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-compat": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/firestore-types": {[m
[31m-      "version": "3.0.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/firestore-types/-/firestore-types-3.0.2.tgz",[m
[31m-      "integrity": "sha512-wp1A+t5rI2Qc/2q7r2ZpjUXkRVPtGMd6zCLsiWurjsQpqPgFin3AhNibKcIzoF2rnToNa/XYtyWXuifjOOwDgg==",[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-types": "0.x",[m
[31m-        "@firebase/util": "1.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/functions": {[m
[31m-      "version": "0.11.7",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/functions/-/functions-0.11.7.tgz",[m
[31m-      "integrity": "sha512-xaUsGI2kYrI8zJXgrNB7SrJKB8v1vJqR16YYi6g6dFTgBz4+VzWJFqqVU60BbdAWm6fXnUrg9gjlJQeqomT2Vg==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/app-check-interop-types": "0.3.2",[m
[31m-        "@firebase/auth-interop-types": "0.2.3",[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/messaging-interop-types": "0.2.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0",[m
[31m-        "undici": "6.19.7"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/functions-compat": {[m
[31m-      "version": "0.3.13",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/functions-compat/-/functions-compat-0.3.13.tgz",[m
[31m-      "integrity": "sha512-qcZvJO2ed6PAD+18DanVztw7WyQVQK43HoRhxusHAwDFvK/xY+mcGpj+IpfdxTNMBGCOIxKFp4Xqk/c2nubBlQ==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/functions": "0.11.7",[m
[31m-        "@firebase/functions-types": "0.6.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-compat": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/functions-types": {[m
[31m-      "version": "0.6.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/functions-types/-/functions-types-0.6.2.tgz",[m
[31m-      "integrity": "sha512-0KiJ9lZ28nS2iJJvimpY4nNccV21rkQyor5Iheu/nq8aKXJqtJdeSlZDspjPSBBiHRzo7/GMUttegnsEITqR+w=="[m
[31m-    },[m
[31m-    "node_modules/@firebase/installations": {[m
[31m-      "version": "0.6.8",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/installations/-/installations-0.6.8.tgz",[m
[31m-      "integrity": "sha512-57V374qdb2+wT5v7+ntpLXBjZkO6WRgmAUbVkRfFTM/4t980p0FesbqTAcOIiM8U866UeuuuF8lYH70D3jM/jQ==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "idb": "7.1.1",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/installations-compat": {[m
[31m-      "version": "0.2.8",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/installations-compat/-/installations-compat-0.2.8.tgz",[m
[31m-      "integrity": "sha512-pI2q8JFHB7yIq/szmhzGSWXtOvtzl6tCUmyykv5C8vvfOVJUH6mP4M4iwjbK8S1JotKd/K70+JWyYlxgQ0Kpyw==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/installations": "0.6.8",[m
[31m-        "@firebase/installations-types": "0.5.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-compat": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/installations-types": {[m
[31m-      "version": "0.5.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/installations-types/-/installations-types-0.5.2.tgz",[m
[31m-      "integrity": "sha512-que84TqGRZJpJKHBlF2pkvc1YcXrtEDOVGiDjovP/a3s6W4nlbohGXEsBJo0JCeeg/UG9A+DEZVDUV9GpklUzA==",[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-types": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/logger": {[m
[31m-      "version": "0.4.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/logger/-/logger-0.4.2.tgz",[m
[31m-      "integrity": "sha512-Q1VuA5M1Gjqrwom6I6NUU4lQXdo9IAQieXlujeHZWvRt1b7qQ0KwBaNAjgxG27jgF9/mUwsNmO8ptBCGVYhB0A==",[m
[31m-      "dependencies": {[m
[31m-        "tslib": "^2.1.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/messaging": {[m
[31m-      "version": "0.12.10",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/messaging/-/messaging-0.12.10.tgz",[m
[31m-      "integrity": "sha512-fGbxJPKpl2DIKNJGhbk4mYPcM+qE2gl91r6xPoiol/mN88F5Ym6UeRdMVZah+pijh9WxM55alTYwXuW40r1Y2Q==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/installations": "0.6.8",[m
[31m-        "@firebase/messaging-interop-types": "0.2.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "idb": "7.1.1",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/messaging-compat": {[m
[31m-      "version": "0.2.10",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/messaging-compat/-/messaging-compat-0.2.10.tgz",[m
[31m-      "integrity": "sha512-FXQm7rcowkDm8kFLduHV35IRYCRo+Ng0PIp/t1+EBuEbyplaKkGjZ932pE+owf/XR+G/60ku2QRBptRGLXZydg==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/messaging": "0.12.10",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app-compat": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/messaging-interop-types": {[m
[31m-      "version": "0.2.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/messaging-interop-types/-/messaging-interop-types-0.2.2.tgz",[m
[31m-      "integrity": "sha512-l68HXbuD2PPzDUOFb3aG+nZj5KA3INcPwlocwLZOzPp9rFM9yeuI9YLl6DQfguTX5eAGxO0doTR+rDLDvQb5tA=="[m
[31m-    },[m
[31m-    "node_modules/@firebase/performance": {[m
[31m-      "version": "0.6.8",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/performance/-/performance-0.6.8.tgz",[m
[31m-      "integrity": "sha512-F+alziiIZ6Yn8FG47mxwljq+4XkgkT2uJIFRlkyViUQRLzrogaUJW6u/+6ZrePXnouKlKIwzqos3PVJraPEcCA==",[m
[31m-      "dependencies": {[m
[31m-        "@firebase/component": "0.6.8",[m
[31m-        "@firebase/installations": "0.6.8",[m
[31m-        "@firebase/logger": "0.4.2",[m
[31m-        "@firebase/util": "1.9.7",[m
[31m-        "tslib": "^2.1.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "@firebase/app": "0.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@firebase/performance-compat": {[m
[31m-      "version": "0.2.8",[m
[31m-      "resolved": "https://registry.npmjs.org/@firebase/performance-compat/-/performance-compat-0.2.8.tgz",[m
[31m-      "integrity": "sha512-o7TFClRVJ