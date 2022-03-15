from locust import HttpUser, task

#8090
#Endpoints for server 1 (running on port 5000)
# http://172.16.1.247:5000

class HelloWorldUser(HttpUser):
 
    @task()
    def getPosts(self):
        self.client.get("/")
