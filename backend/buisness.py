def get_data():

    with open("data.txt", 'r') as file:
        data = file.read()
        data = data.split()

    return data


