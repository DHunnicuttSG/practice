from django.shortcuts import render, redirect, get_object_or_404
from .models import Todo
from .forms import TodoForm

# Create your views here.
def todos(request):
    if request.method =='POST':   # checks method
        form = TodoForm(request.POST)  #Gets all the data from the form

        if form.is_valid():
            form.save()
            return redirect('todos') #ref in urls.py file
    else:
        form = TodoForm() #get empty form

    todos = Todo.objects.all()
    return render(request, 'todos.html', {'todos': todos, 'form': form}) #append form to list

def todo(request, pk):  # need primary key of todo
    todo = get_object_or_404(Todo, pk=pk)

    change_status = request.GET.get('change_status', '')

    if change_status:
        todo.is_done = True
        todo.save()

    return render(request, 'todo.html', {'todo': todo})
