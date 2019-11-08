# Comando para transformar a fatura do Nubank em um arquivo tabulado

``` console

cat /tmp/arquivo-ori.txt | sed -e 'N;s/\n/ /' -e 's/^[[:digit:]]\{2\}\s[[:upper:]]\{3\}\s/&\t/g' -e 's/\t-\([[:digit:]]\)/\t\1/g' | sort -r | awk -F '\t' '{print "#N
u " $2 "\t" $1  "\t" $3 }' > /tmp/arquivo.txt

```
