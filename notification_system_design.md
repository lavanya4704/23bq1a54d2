# Stage 1 - Notification System Design

## Objective

The objective is to create a Priority Inbox that displays the Top 10 most important unread notifications.

Priority is determined using:

1. Notification Type Weight
2. Recency (Timestamp)

---

## Priority Weights

| Type | Weight |
|--------|--------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

Placement notifications have the highest priority, followed by Result and Event notifications.

---

## Approach

1. Fetch notifications from the Notification API.
2. Assign weights based on notification type.
3. Sort notifications:
   - First by weight (descending)
   - Then by timestamp (descending)
4. Select the first 10 notifications.
5. Display them as the Priority Inbox.

---

## Example

Placement notifications always appear before Result notifications.

Among notifications of the same type, newer notifications appear first.

---

## Time Complexity

Sorting Notifications:

O(N log N)

Selecting Top 10:

O(10)

Overall:

O(N log N)

---

## Efficient Maintenance of Top 10

When new notifications arrive continuously, sorting the entire list every time is inefficient.

To maintain the Top 10 efficiently:

### Min Heap Approach

Maintain a Min Heap of size 10.

Algorithm:

1. Calculate priority score for incoming notification.
2. If heap size < 10:
   - Insert notification.
3. Else:
   - Compare with minimum priority notification.
   - If incoming notification has higher priority:
     - Remove minimum notification.
     - Insert new notification.

### Complexity

Insertion:

O(log 10)

Memory:

O(10)

This ensures efficient real-time maintenance of the Priority Inbox.