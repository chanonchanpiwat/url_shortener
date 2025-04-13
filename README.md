# long_url -> url
# -> redirect
# localhost/api

# Functional requirement
1. can short url
2. redirect to that url

# Non Functional requirement
1. scalable 
2. no race condition

# api
POST url 
{ originalURL: "mock" }

GET url
hostname/shorten_url
redirect originalURL

# entity
schema

url
- id
- original_url
- creation_info [created_at, updated_at, deleted_at]

entity

createUrlMapper(
  originalURL,
  mapperFunction,
)

urlMapper.getShortenUrl()

urlMapper.getOriginalUrl()

save -> easy
get redirect -> hit cache 
-> see cache -> get data
-> did not see 


