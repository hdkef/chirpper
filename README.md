## Chirpper
Chirpper is twitter clone app which highly depends on websocket technology to deliver realtime communication. It uses angular framework as frontend and golang as backend

# NGRX Explanation
Auth redux : The purpose of auth redux is to manage everything related to authentication, for example register, login, autologin, change user's settings etc.

Endpoint redux : The purpose of endpoint redux is to manage everything related to feeds. For example there are feeds, and comments.

# Component explanation
Comment : this component is specially used to see detailed comment on feed item.
Find    : this component is to find other user's profile
Profile : this component is to see someone's profile or ours.
Settings : this is a dedicated component to change user's settings, like Images, Desc, Name, etc
Login : to login
Register : to register
Feed    : this component is the main feed of user, it contains feed and an input to create new chirp (tweet) with/without image.

# WS-Service & Comment-WS
WS-Service is being called whenever the autologin is succeed or after user logging in. This is basically do websocket handshake with the server so that realtime communication can be established. Comment-WS is basically do the same, but it's specially designed to maintain realtime communication for a specific feed item (be called whenever the user see comments section of a feed item)

# TODO
Follow method haven't been implemented because Firebase currently doesn't support array manipulation.
Until then, this feature will not be created.