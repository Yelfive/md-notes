# Cannot `Step Into` when Debugging Using Eclipse

This happens probably because you are using `jre` instead of `jdk`,
of which the former is just **runtime**

## How to solve this

Change `jre` into that of `jdk`

### Step 1: Edit configuration

![1606101205915](images/Cannot-Step-Into/1606101205915.png)

![1606101182406](images/Cannot-Step-Into/1606101182406.png)

### Step 2: Replace `jre`with another from `jdk`

![1606101238326](images/Cannot-Step-Into/1606101238326.png)

Click <kbd>Add...</kbd> , choose `Standard VM` and click <kbd>Next ></kbd>

![1606101323787](images/Cannot-Step-Into/1606101323787.png)

### Step 3: Choose `jre`

![1606101412267](images/Cannot-Step-Into/1606101412267.png)

Click <kbd>Directory...</kbd>, and navigate to the directory of `jre`, click <kbd>Finish</kbd>.
