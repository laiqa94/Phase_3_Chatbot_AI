from fastapi import APIRouter
from app.api.v1.auth import auth_router
from app.api.v1.tasks import tasks_router


api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(tasks_router, prefix="/tasks", tags=["tasks"])