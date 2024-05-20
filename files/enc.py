
base = 1009
offset = 111

def encrypt(msg):
    enc = ''

    for i in msg:
        enc += chr((ord(i) % offset) + base )

    return enc

t = input("[+] Enter the text to encrypt:")
print("[=] Encrypted text: "+encrypt(t))



# [=] Encrypted text: ϴє϶їϽѓђϵњєѐєіђϵіϴѐєњϲљіϴϿ
