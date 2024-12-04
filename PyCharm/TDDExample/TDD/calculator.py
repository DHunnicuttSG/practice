class Calculator:
    def add(self, x, y):
        return x + y

    def subtract(self, x, y):
        return x - y

    def multiply(self, x, y):
        return x * y

    def divide(self, x, y):
        try:
            result = x / y
        except ZeroDivisionError as e:
            result = "division by zero"
        finally:
            return str(result)

    def FtoC(self, f):
        return (f - 32) * 5 / 9
