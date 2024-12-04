import unittest

from TDD.calculator import Calculator


class MyTestCase(unittest.TestCase):
    def test_add(self):
        self.assertEqual(3, Calculator.add(Calculator(), 1, 2))

    def test_subtract(self):
        self.assertEqual(3, Calculator.subtract(Calculator(), 6, 3))


    def test_multiply(self):
        self.assertEqual(8, Calculator.multiply(Calculator(), 4,  2))

    def test_divide(self):
        self.assertEqual('8.0', Calculator.divide(Calculator(), 16, 2))
        self.assertEqual("division by zero", Calculator.divide(Calculator(), 16, 0))

    def test_FtoC(self):
        self.assertEqual(-40, Calculator.FtoC(Calculator(), -40))
        self.assertEqual(0, Calculator.FtoC(Calculator(), 32))
        self.assertEqual(100, Calculator.FtoC(Calculator(), 212))
        self.assertEqual('37.78', format(Calculator.FtoC(Calculator(), 100), '.2f'))

if __name__ == '__main__':
    unittest.main()
