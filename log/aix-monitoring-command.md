# AIX 모니터링 쉘 스크립트

## Process
```sh
echo `ps -ef | grep "java" | wc -l`
```

## CPU 사용량
```sh
#!/bin/ksh

#create timestamp
timestamp=`date +%Y%m%d_%H%M%S`

#echo "Gathering CPU usage : "$timestamp

#create target file name
target='./dat/cpu_'$timestamp'.out'
#echo 'file path is '$target

#bulk=`vmstat`

#count
cnt=3
#create target file to gather vmstat information
vmstat 1 $cnt > $target

user=`tail -n $cnt $target | awk '{print $14}'`
sys=`tail -n $cnt $target | awk '{print $15}'`
idle=`tail -n $cnt $target | awk '{print $16}'`

sum=0
for KK in $idle
do
#   echo 'idle: '$KK
   let "sum=sum+$KK"
done
let "avg=sum/$cnt"
let "avg=100-avg"

#echo 'Average idle of CPU usage: '$avg

echo $avg

#echo "Job ends..."
```

## 메모리 사용량
```sh
#!/bin/ksh

# getMEMusage.sh


# Physical Memory
#phy=`svmon -G |grep memory |perl -ane 'printf"%0.1f \n", 100 - ( ( $F[3] / $F[1] ) * 100 )'`

# Paging space
#pg=`svmon -G |grep 'pg space' |perl -ane 'printf"%0.1f \n", ( ( $F[3] / $F[2] ) * 100 )'`

#echo "Physical MEM usage: "$phy
#echo "Paging Space usage: "$pg
#echo $phy", "$pg

###########################
total=`svmon -G -O unit=MB | grep "memory" | awk '{print $2}'`
work=`svmon -G -O unit=MB | grep "in use" | awk '{print $3}'`

#echo "total: "$total
#echo "work: "$work

used=`echo "$work $total" | awk '{printf "%.2f", $1/$2*100}'`

#echo "MEM usage(%): "$used
echo $used

# Job finished...
```


## 디스크 사용량
```sh
#!/bin/ksh
# getDiskUsage.sh

#target: grep으로 검색할 경로
target=$1

#disk usage
disk=`df -gi | grep ".*"$target"$" | awk '{print $4}' | tr -d '\%'`

echo $disk

#echo "Job ends..."
```
