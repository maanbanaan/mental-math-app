import numpy as np
import matplotlib.pyplot as plt


l = [i for i in range(1, 14)]

print(np.var(l))

outcomes = []

for card in range(1, 14):
    for dice in range(1, 7):
        outcomes.append(card * dice)

print(np.mean(outcomes))
print(np.std(outcomes))

plt.hist(outcomes, bins=[i * 10 for i in range(10)], edgecolor='black')
plt.xticks([i * 10 for i in range(10)])
plt.show()

print(np.mean([i ** 2 for i in range(1, 14)]))