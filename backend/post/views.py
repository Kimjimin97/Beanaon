from rest_framework import generics, status, filters
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django.http import JsonResponse

from map.models import Address

from .serializers import CommentSerializer, PostCreateSerializer, PostDetailSerializer, PostListSerializer

from .models import Post, Comment

from .permissions import IsOwnerOrReadOnly



class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = PostCreateSerializer(data=request.data)
        address = Address.objects.filter(addressname=request.data['address'])
        print(address)
        if serializer.is_valid():
            post = Post.objects.create(
                user_id=request.user.id,
                title=request.data['title'],
                content=request.data['content'],
                category=request.data['category'],
                address=address[0]
            )

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = [AllowAny]


class CommentCreate(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            comment = Comment.objects.create(
                user_id=request.user.id,
                post_id=self.kwargs['pk'],
                content=request.data['content']
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

class UserPostsList(generics.ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Post.objects.filter(user=user)
        else:
            return Post.objects.none()

class CategorySearchListView(generics.ListAPIView):
    serializer_class = PostListSerializer
    queryset = Post.objects.all()
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # SearchFilter
    search_fields = ['category']
    ordering = ['-updated_at']

class UserCommentsList(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Comment.objects.filter(user=user)
        else:
            return Comment.objects.none()

class NearTheUserPosts(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = self.request.user
            # ????????? ??????
            user_address = user.address
            # ????????? ????????? ??????, ????????? ????????? ???
            user_lat, user_long = user.lat, user.long
            LATMOD = 109.958489129649955
            LONGMOD = 88.74
            addresses = Address.objects.all()
            result = []
            for address in addresses:
                if user_lat - 1/LATMOD <= address.lat <= user_lat + 1/LATMOD and \
                        user_long - 1/LONGMOD <= user_long <= user_long + 1/LONGMOD :
                    for post in Post.objects.filter(address_id=address.id):
                        result.append({
                            'id': post.id,
                            'username': post.user.nickname,
                            'title': post.title,
                            'category': post.category,
                            'content': post.content,
                            'created_at': post.created_at,
                            'updated_at': post.updated_at,

                        })
            return JsonResponse({'result': result}, status=status.HTTP_200_OK)
        except KeyError:
            return JsonResponse({'err_msg': 'KEY_ERROR'}, stauts=status.HTTP_400_BAD_REQUEST)