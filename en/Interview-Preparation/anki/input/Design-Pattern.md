# Design Pattern

## SOLID

1. Single responsibility principle: 单一职责原则
2. Open closed principle: 对扩展开放，对修改封闭。
3. Liskov substitution principle: 里式替换原则。
4. Interface segregation principle: 接口隔离原则。
5. Dependency inversion principle: 依赖倒置原则

---

**Details**

### 1. SRP

一个类只应该负责一件事

> There should never be more than one reason for a class to change.

### 2. OCP

当需求变化，版本迭代时，应该尽量扩展已有实体，而非修改已有代码。这样可以保证已有系统的问题定性。

### 3. LSP

所有引用基类的地方必须能透明地使用其子类的对象。

1. 不能重写父类方法
2. 可以重载父类方法（修改父类方法参数）
3. 必须实现父类的抽象方法，返回值应该缩紧
4. 可以增加自己的方法

### 4. ISP

类应该使用恰当的接口，不应该臃肿。

1. 客户端不应该依赖它不需要的接口。
2. 类间的依赖关系应该建立在最小的接口上。

### 5. DIP

1. 上层模块不应该依赖底层模块，它们都应该依赖于抽象。
2. 抽象不应该依赖于细节，细节应该依赖于抽象。

