from rest_framework import permissions

from accounts import models


class IPBLackListPermission(permissions.BasePermission):
    """ Permission check for blacklisted IP """ 

    def has_permission(self, request, view):
        ip_addr = request.META['REMOTE_ADDR']
        blacklisted = models.IPBlackList.objects.filter(ip_addr=ip_addr).exists()
        return not blacklisted
        