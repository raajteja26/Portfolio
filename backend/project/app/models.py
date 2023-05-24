from django.db import models

# Create your models here.

class Techincal_skills(models.Model):
    o_s = models.CharField(max_length=255)
    languages = models.CharField(max_length=255)
    database = models.CharField(max_length=255)
    tools = models.CharField(max_length=255)
    version_control_systems = models.CharField(max_length=255)

    # def __str__(self):
    #     return f"{self.languages}"
class Projects(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    technologies = models.CharField(max_length=255)
    responsibilities = models.TextField()

    # def __str__(self):
    #     return f"{self.name}"
