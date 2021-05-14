# ilmoitustaulu
Robin Haddadin, Juuso Lahtisen ja Olli Kolkin ryhmätyö Metropolian web-sovelluskehitys 1 kurssia varten.

## REST API

method: 'POST'  
endpoint: http://localhost:8081/api/register  
response: JSON object  
parameters: user.nickname, user.password  

method: 'POST'  
endpoint: http://localhost:8081/api/login  
response: JSON object  
parameters: user.nickname, user.password  

method: ‘POST’  
endpoint: http://localhost:8081/api/POST  
response: JSON array  
parameters: post.comment, user.user_id, time.date, time.timestamp, time.post_id  

method: ‘GET’  
endpoint: http://localhost:8081/api/getpostid  
response: JSON object  
parameters: post.post_id  

method: ‘GET’  
endpoint: http://localhost:8081/api/getallposts  
response: JSON array  
parameters: user.user_id, user.nickname, post.post_id, post.comment, post.user_id, time.time_id, time.date, time.timestamp, time.post_id  

method: ‘DELETE’  
endpoint: http://localhost:8081/api/DELETE  
response: JSON array  
parameters: time.post_id, post.user_id, user.user_id  
